//
//  LCCodeTextNode.m
//  Test
//
//  Created by bawn on 28/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCCodeTextNode.h"
#import "UIColor+LCColor.h"
#import "NSMutableAttributedString+LCLineSpace.h"

@implementation LCCodeTextNode

- (instancetype)initWithContent:(NSString *)text{
    self = [super init];
    if (self) {
        self.textContainerInset = UIEdgeInsetsMake(10.0f, 16.0f, 10.0f, 16.0f);
        
        NSString *lineFeedString = @"\n";
        if ([text hasSuffix:lineFeedString]) {
            text = [text substringToIndex:text.length - lineFeedString.length];
        }
        self.attributedText = [NSMutableAttributedString attributedWithPString:text];
    }
    return self;
}


@end

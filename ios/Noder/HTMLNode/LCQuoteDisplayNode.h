//
//  LCQuoteDisplayNode.h
//  Test
//
//  Created by bawn on 28/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import <AsyncDisplayKit/AsyncDisplayKit.h>

@class HTMLNode;

@interface LCQuoteDisplayNode : ASDisplayNode

- (instancetype)initWithContent:(HTMLNode *)htmlNode delegate:(id<ASTextNodeDelegate>)delegate;;

@end

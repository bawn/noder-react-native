//
//  LCHtmlNode.h
//  Noder
//
//  Created by bawn on 07/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <AsyncDisplayKit/AsyncDisplayKit.h>

typedef void (^LCLayoutDidFinishBlock)(CGSize size);
typedef void (^LCClickUserLinkBlock)(NSDictionary *dic);

@interface LCHtmlNode : ASDisplayNode

@property (nonatomic, strong) NSOrderedSet *nodes;
@property (nonatomic, copy) LCLayoutDidFinishBlock layoutDidFinishBlock;
@property (nonatomic, copy) LCClickUserLinkBlock clickUserLinkBlock;

//- (instancetype)initWithArray:(NSOrderedSet *)nodes;

@end
